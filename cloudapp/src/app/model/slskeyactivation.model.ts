
/**
 * Alma User Object
 *
 * @export
 * @class User
 */
export class SlskeyActivation {

    slskey_user_id: Number;
    slskey_group_id: Number;
    // slskeyGroup: SlskeyGroup; TODO:
    activated: boolean;
    activation_date: Date;
    deactivation_date: Date;
    expiration_date: Date;
    expiration_disabled: boolean;
    blocked: boolean;
    blocked_date: Date;
    remark: String;
    member_educational_institution: boolean;

    constructor(data: any = {}) {
        if(data) {
            this.slskey_user_id = data.slskey_user_id;
            this.slskey_group_id = data.slskey_group_id;
            this.activated = data.activated;
            this.activation_date = data.activation_date;
            this.deactivation_date = data.deactivation_date;
            this.expiration_date = data.expiration_date;
            this.blocked = data.blocked;
            this.blocked_date = data.blocked_date;
            this.remark = data.remark;
            this.member_educational_institution = data.member_educational_institution
        }
    }


}
