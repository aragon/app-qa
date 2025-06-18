import { networkDefinitions } from '../../constants';
import { type IPageParams, WizardPage } from '../../shared';
import type { IResource, Network } from '../../types';

export interface IInsertMetadataParams {
    name: string;
    logo?: string;
    description: string;
    resources?: IResource[];
}

export interface ICreateDaoPageParams extends Omit<IPageParams, 'path'> {}

export class CreateDaoPage extends WizardPage {
    constructor(params: ICreateDaoPageParams) {
        const { page } = params;
        super({ page, path: '/create/dao', sumbitLabel: 'Publish DAO', successLabel: 'View DAO' });
    }

    private defaultLogoPath = './src/helpers/assets/images/dao-logo-default.png';

    selectNetwork = (network: Network) =>
        this.page.getByRole('radio', { name: networkDefinitions[network].name }).click();

    insertMetadata = async (params: IInsertMetadataParams) => {
        const { name, logo, description, resources } = params;

        await this.insertName(name);
        await this.insertLogo(logo);
        await this.insertDescription(description);
        await this.insertResources(resources);
    };

    insertName = (name: string) => this.getNameField().fill(name);

    insertLogo = async (logo = this.defaultLogoPath) => {
        const logoField = this.getLogoField();

        // The input tag of the logo field is hidden, therefore we need to force the click
        // eslint-disable-next-line playwright/no-force-option
        await logoField.click({ force: true });
        await logoField.setInputFiles(logo);
    };

    insertDescription = (description: string) => this.getDescriptionField().fill(description);

    insertResources = async (resources: IResource[] = []) => {
        for (const [index, resource] of resources.entries()) {
            await this.insertResource(resource, index);
        }
    };

    private insertResource = async (resource: IResource, index = 0) => {
        const { text, url } = resource;
        await this.addResource();
        await this.insertResourceText(text, index);
        await this.insertResourceUrl(url, index);
    };

    private insertResourceText = (text: string, index = 0) => this.getResourceTextField(index).fill(text);

    private insertResourceUrl = (url: string, index = 0) => this.getFieldByLabel('URL', index).fill(url);

    private getNameField = () => this.getFieldByLabel('DAO name');

    private getLogoField = () => this.page.getByLabel('Logo').nth(0);

    private getDescriptionField = () => this.getFieldByLabel('Description');

    private addResource = () => this.page.getByRole('button', { name: 'Add' }).click();

    private getResourceTextField = (index = 0) => this.getFieldByLabel('Link text', index);

    private getFieldByLabel = (label: string, index = 0) => this.page.getByRole('textbox', { name: label }).nth(index);
}
