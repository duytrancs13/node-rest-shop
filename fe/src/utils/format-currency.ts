export const formatCurrency = (language: string, price: number) => {
  if (language === 'en') {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace(' ₫', 'đ');
};

export default formatCurrency;
