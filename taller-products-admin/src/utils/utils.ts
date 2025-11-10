// --- UTILIDAD DE FORMATO DE MONEDA CON SEPARADORES ---
export const formatCurrency = (amount: number): string => {
    // Usa Intl.NumberFormat para formatear con separador de miles y decimales
    // Se usa 'en-US' para obtener el formato típico de '$#,###.##'
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
};

// --- UTILIDAD DE FORMATO DE MONEDA CON SEPARADORES ---
export const formatQuantity = (quantity: number): string => {
    // Usa Intl.NumberFormat para formatear con separador de miles y decimales
    // Se usa 'en-US' para obtener el formato típico de '$#,###.##'
    return new Intl.NumberFormat('en-US').format(quantity);
};