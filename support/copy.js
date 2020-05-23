/**
 * safely copy
 *
 * @method copy
 * @param  {Any} data
 * @return {Any}
 */
const copy = data => JSON.parse(JSON.stringify(data))

export default copy
