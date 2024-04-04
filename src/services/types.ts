export interface ApiResponse {
    items: Tag[];
    total: number;

}
  
export interface Tag {
    name: string;
    count: number;
}