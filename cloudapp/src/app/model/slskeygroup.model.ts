import { SlskeyActivation } from "./slskeyactivation.model";

/**
 * Alma User Object
 *
 * @export
 * @class User
 */
export class SlskeyGroup {

    name: String;
    value: String;
    workflow: String;
    show_member_educational_institution: boolean = false;
    isWorkFlowWebhook: boolean = false;
    activation: SlskeyActivation | null = null;

    constructor(data: any = {}) {
        if (data) {
            this.name = data.name;
            this.workflow = data.workflow;
            this.show_member_educational_institution = data.show_member_educational_institution;
            this.isWorkFlowWebhook = data.workflow == 'Webhook';
            this.value = data.value;
            this.activation = data.activation ? new SlskeyActivation(data.activation): null;
        }
    }


}
