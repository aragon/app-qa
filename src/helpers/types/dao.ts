import type { Network } from './enum';
import type { IResource } from './resource';

export interface IDao {
    id: string;
    logo?: string;
    network: Network;
    name: string;
    description: string;
    resources: IResource[];
}
