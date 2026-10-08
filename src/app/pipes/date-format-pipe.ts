import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** {{ '2026-10-08' | dateFormat }}  ->  "08 Oct 2026". Parses by hand to avoid timezone shifts. */
@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? '');
    return m ? `${m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}` : '—';
  }
}
