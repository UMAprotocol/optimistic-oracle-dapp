// String has a particular format that includes break points like q: title: description:
// Split the string based on these common parts of query strings.

export default function formatYesNoQueryString(str: string) {
  // Split the string before title:
  const splitOne = str.split("title: ")[1];

  // Remove the string after description:
  const title = splitOne.split("description:")[0].replace(/[^\x20-\x7E]+/g, "");

  // remove the comma at the end.
  const formatted = title.substring(0, title.length - 2);

  return formatted;
}
