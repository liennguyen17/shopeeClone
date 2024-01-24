export const sortBy = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const
// as const : chỉ đọc được thôi nó readonly ko ghi/cập nhật dc

export const order = {
  asc: 'asc',
  desc: 'desc'
} as const
