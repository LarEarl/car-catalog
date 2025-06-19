export interface Car {
  mark_id: string;
  folder_id: string;
  price: number;
  images: {
    image: string[];
  };
  modification_id?: string;
  year?: number;
}
