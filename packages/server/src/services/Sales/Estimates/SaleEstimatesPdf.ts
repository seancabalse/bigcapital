import { Inject, Service } from 'typedi';
import { ChromiumlyTenancy } from '@/services/ChromiumlyTenancy/ChromiumlyTenancy';
import { TemplateInjectable } from '@/services/TemplateInjectable/TemplateInjectable';

@Service()
export class SaleEstimatesPdf {
  @Inject()
  private chromiumlyTenancy: ChromiumlyTenancy;

  @Inject()
  private templateInjectable: TemplateInjectable;

  /**
   * Retrieve sale invoice pdf content.
   * @param {} saleInvoice -
   */
  async getSaleEstimatePdf(tenantId: number, saleEstimate) {
    const htmlContent = await this.templateInjectable.render(
      tenantId,
      'modules/estimate-regular',
      {
        saleEstimate,
      }
    );
    return this.chromiumlyTenancy.convertHtmlContent(tenantId, htmlContent, {
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });
  }
}
