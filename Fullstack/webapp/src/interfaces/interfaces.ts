import { IconButtonProps } from '@mui/material/IconButton';

export interface Menu {
    name: string,
    price: number,
    ingredientsEnglish: any,
    ingredientsFinnish: any,
}

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}