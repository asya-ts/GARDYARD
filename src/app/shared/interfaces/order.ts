interface ProductInOrderSchema {
    count: number;
    productId: number;
}

enum States {
    NEW,
    SENT,
    CLOSED
}

interface Review {
    total: number;
    average: number;
}

export interface Order {
    No: number;
    userId: string;
    date: Date;
    state: States;
    products: [ProductInOrderSchema];
    review ? : Review;
}