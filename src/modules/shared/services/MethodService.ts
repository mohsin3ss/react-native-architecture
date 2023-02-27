import * as lodash from "lodash";

export class MethodService {
  mapSavingFields(toSave: any, data: { createdOn: Date; updatedOn: Date }) {
    if (!data.createdOn) {
      data.createdOn = new Date();
    }
    if (!data.updatedOn) {
      data.updatedOn = new Date();
    }
    return lodash.assign(toSave, lodash.pick(data, lodash.keys(toSave)));
  }
}
