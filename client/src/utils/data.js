//TO CONVERT DATA
export const Size = (data) => {
	const number = Number(data);
	if (number === 1) {
		return 'F';
	}
	if (number === 2) {
		return 'S';
	}
	if (number === 3) {
		return 'M';
	}
	if (number === 4) {
		return 'L';
	}
	if (number === 5) {
		return 'XL';
	}
	if (number === 6) {
		return 'XXL';
	}
};
export const Color = (data) => {
	const number = Number(data);
	if (number === 1) {
		return 'Black';
	}
	if (number === 2) {
		return 'Green';
	}
	if (number === 3) {
		return 'Yellow';
	}
	if (number === 4) {
		return 'White';
	}
	if (number === 5) {
		return 'Grey';
	}
	if (number === 6) {
		return 'Red';
	}
};
export const Warehouse = (data) => {
	const number = Number(data);
	if (number === 1) {
		return 'A';
	}
	if (number === 2) {
		return 'B';
	}
	if (number === 3) {
		return 'C';
	}
};
export const Category = (data) => {
	const number = Number(data);
	if (number === 1) {
		return 'Man';
	}
	if (number === 2) {
		return 'Woman';
	}
};
