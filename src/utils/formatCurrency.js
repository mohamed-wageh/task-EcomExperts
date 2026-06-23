const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(amount) {
  return CURRENCY_FORMATTER.format(amount);
}

export function formatMonthly(amount) {
  return `${CURRENCY_FORMATTER.format(amount)}/mo`;
}
