export const formatPrice = (amount: number, currency: string = 'Rs.'): string => {
  return `${currency} ${amount.toLocaleString('en-PK')}`;
};