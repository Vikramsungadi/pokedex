export const capitalize = (word) => word?.charAt(0).toUpperCase() + word?.substring(1).toLowerCase();
export const capitalizeAll = (word) =>
	word
		?.split("-")
		.map((splitWord) => capitalize(splitWord))
		.join(" ");
