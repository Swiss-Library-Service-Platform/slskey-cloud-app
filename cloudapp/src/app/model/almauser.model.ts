
/**
 * Alma User Object
 *
 * @export
 * @class User
 */
export class AlmaUser {

    primary_id: String;
    full_name: String;
    data: any;

    constructor(data: any = {}) {
        if (data) {
            this.primary_id = data.primary_id;
            this.full_name = data.full_name;
            this.data = data;
        }
    }

}
