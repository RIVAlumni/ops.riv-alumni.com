import { tap } from 'rxjs/operators';

export const count = <T>(label: string) => tap<T>(() => console.count(label));
