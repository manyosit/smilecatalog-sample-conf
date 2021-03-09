//check if customer department starts with itg
if (customer &&
    customer.Department &&
    customer.Department.toUpperCase().startsWith('APP')) {
    resolve(true);
} else {
    resolve(false);
}
