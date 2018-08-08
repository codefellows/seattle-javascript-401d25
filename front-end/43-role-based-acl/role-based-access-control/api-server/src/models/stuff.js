export default class Stuff {
  /**
   * Creates an instance of Stuff.
   * All methods are setup to match the mongoose interface so that our generic (model agnostic) REST API routes will work well.
   * @param {*} data
   * @memberof Stuff
   */
  constructor(data) {}

  /**
   * Find all records
   *
   * @memberof Stuff
   */
  find() {}

  /**
   * Find one record and return it
   *
   * @param {*} id
   * @memberof Stuff
   */
  findOne(id) {}

  /**
   * Locate and return a single record
   *
   * @memberof Stuff
   */
  save() {}

  /**
   * Save a record
   *
   * @param {*} id
   * @param {*} data
   * @memberof Stuff
   */
  findByIdAndUpdate(id, data) {}

  /**
   * Remove one record by id
   *
   * @param {*} id
   * @memberof Stuff
   */
  findByIdAndRemove(id) {}
}
