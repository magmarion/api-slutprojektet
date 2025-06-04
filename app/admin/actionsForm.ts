'use server';

import { productSchema } from '@/lib/schemas';
import { createProduct, deleteProduct, updateProduct } from './actions';

// Wrapper for creating a product via form submission.
export async function createProductAction(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    image: formData.get('image') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    category: formData.get('category') as string,
  };

  const validationResult = productSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      error: 'Validering misslyckades',
      details: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const createResult = await createProduct(validationResult.data);
    if (createResult.success) {
      return { success: true };
    } else {
      return { success: false, error: createResult.error };
    }
  } catch (error) {
    console.error('Fel vid skapande av produkt:', error);
    return { success: false, error: 'Det gick inte att skapa produkten' };
  }
}

// Wrapper for updating a product via form submission.
export async function updateProductAction(
  formData: FormData,
  articleNumber: string
) {
  const data = {
    title: formData.get('title') as string,
    image: formData.get('image') as string,
    price: Number(formData.get('price')),
    description: formData.get('description') as string,
    category: formData.get('category') as string,
  };

  const validationResult = productSchema.safeParse(data);
  if (!validationResult.success) {
    return {
      success: false,
      error: 'Validering misslyckades',
      details: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const updateResult = await updateProduct(
      articleNumber,
      validationResult.data
    );

    if (updateResult.success) {
      return { success: true };
    } else {
      return { success: false, error: updateResult.error };
    }
  } catch (error) {
    console.error('Fel vid uppdatering av produkt:', error);
    return { success: false, error: 'Det gick inte att uppdatera produkten' };
  }
}

// Wrapper for deleting a product via form submission.
export async function deleteProductAction(formData: FormData) {
  const articleNumber = formData.get('articleNumber') as string;

  if (!articleNumber) {
    return { success: false, error: 'Artikelnummer saknas' };
  }

  try {
    const validationResult = await deleteProduct(articleNumber);

    if (validationResult.success) {
      return { success: true };
    } else {
      return { success: false, error: validationResult.error };
    }
  } catch (error) {
    console.error('Fel vid radering av produkt:', error);
    return { success: false, error: 'Det gick inte att ta bort produkten' };
  }
}
