const fileRaw = await uploads.getFile('horst')
const content = JSON.parse(fileRaw)
log.debug(content)
resolve(content)