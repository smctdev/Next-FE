export default function formatFileSize(file: any) {
  if (file < 1024) {
    return file.toFixed(2) + " B";
  } else if (file < 1024 * 1024) {
    return (file / 1024).toFixed(2) + " KB";
  } else if (file < 1024 * 1024 * 1024) {
    return (file / (1024 * 1024)).toFixed(2) + " MB";
  } else if (file < 1024 * 1024 * 1024 * 1024) {
    return (file / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  } else {
    return (file / (1024 * 1024 * 1024 * 1024)).toFixed(2) + " TB";
  }
}
