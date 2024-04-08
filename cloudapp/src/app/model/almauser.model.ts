
/**
 * Alma User Object
 *
 * @export
 * @class User
 */
export class AlmaUser {

    primaryId: String;
    fullName: String;

    constructor(data: any = {}) {
        if (data) {
            this.primaryId = data.primary_id;
            this.fullName = data.full_name;
        }
    }

}
