const versionStore = {}

function saveVersion(docId, content, timestamp) {
  if (!versionStore[docId]) {
    versionStore[docId] = []
  }
  versionStore[docId].push({ content, timestamp })
}

function getVersions(docId) {
  return versionStore[docId] || []
}

module.exports = {
  saveVersion,
  getVersions
}
