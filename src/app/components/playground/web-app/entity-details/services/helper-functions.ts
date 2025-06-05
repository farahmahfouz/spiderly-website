import { HttpResponse } from "@angular/common/http";
import { BaseEntity } from "../entities/base-entity";
import { SpiderlyFormControl, SpiderlyFormGroup } from "../spiderly-form-control/spiderly-form-control";
import { ToastMessageOptions } from "primeng/api";
import { SpiderlyClass } from "../../../entities/entities";
import { EntityAttributeCodes, PropertyAttributeCodes } from "../../../class-form/services/get-options-functions";
import { PrimengOption } from "../entities/primeng-option";

// Helper function for PrecisionScale validation (to be added in the TypeScript output):
export function validatePrecisionScale(value: any, precision: number, scale: number, ignoreTrailingZeros: boolean): boolean {
    if (typeof value !== 'number') return false;
    const [integerPart, decimalPart] = value.toString().split('.');
    if (integerPart.length > precision - scale) return false;
    if (decimalPart && decimalPart.length > scale) return false;
    if (!ignoreTrailingZeros && decimalPart && decimalPart.replace(/0+$/, '').length > scale) return false;
    return true;
}

export function getMimeTypeForFileName(fileName: string): string {
    const mimeTypes: { [key: string]: string } = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
        '.gif': 'image/gif',
        '.pdf': 'application/pdf',
        '.txt': 'text/plain',
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.csv': 'text/csv',
        '.xml': 'application/xml',
        '.zip': 'application/zip',
        '.mp4': 'video/mp4',
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.avi': 'video/x-msvideo',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // Add more as needed
    };

    const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    return mimeTypes[extension] || 'application/octet-stream'; // 'application/octet-stream' is a generic binary type
}

export function adjustColor(color: string, percent: number): string {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
        console.error('Invalid hex color format');
    }

    let r: number, g: number, b: number;
    if (color.length === 7) {
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
    } else {
        r = parseInt(color[1] + color[1], 16);
        g = parseInt(color[2] + color[2], 16);
        b = parseInt(color[3] + color[3], 16);
    }

    const adjust = (value: number, percent: number): number => {
        const amount = (percent / 100) * 255;
        const newValue = Math.min(Math.max(value + amount, 0), 255);
        return Math.round(newValue);
    };

    r = adjust(r, percent);
    g = adjust(g, percent);
    b = adjust(b, percent);

    const toHex = (value: number): string => {
        const hex = value.toString(16).padStart(2, '0');
        return hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getHtmlImgDisplayString64(base64String: string){
    if (base64String == null)
        return null;

    const [header, base64Content] = base64String.split(';base64,');
    const fileName = header.split('=')[1];
    const mimeType = getMimeTypeForFileName(fileName);
    return `data:${mimeType};base64, ${base64Content}`;
}

export function nameof<TObject>(obj: TObject, key: keyof TObject): string;
export function nameof<TObject>(key: keyof TObject): string;
export function nameof(key1: any, key2?: any): any {
  return key2 ?? key1;
}
export function nameOf<TObject extends {name:S}, S extends string>(funcOrClass: TObject): S {
    return funcOrClass.name;
}

export function getParentUrl(currentUrl: string){
    const urlSegments = currentUrl.split('/');
    urlSegments.pop();
    const parentUrl = urlSegments.join('/');
    return parentUrl;
}

  export function firstCharToUpper(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  export function splitPascalCase(input: string) {
    const regex = /($[a-z])|[A-Z][^A-Z]+/g;
    return input.match(regex).join(" ");
  }

  // export function getMonth(number: number): string {
  //   const months: string[] = [
  //     "January", "February", "March", "April", "May", "June",
  //     "July", "August", "September", "October", "November", "December"
  //   ];
    
  //   if (number < 1 || number > 12) {
  //     throw new Error("Invalid month number. It should be between 1 and 12.");
  //   }
    
  //   return months[number - 1];
  // }

  export function getMonth(numberOfTheMonth: number): string {
    const meseci: string[] = [
      "Januar", "Februar", "Mart", "April", "Maj", "Jun",
      "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
    ];
    
    if (numberOfTheMonth < 1 || numberOfTheMonth > 12) {
      console.error("Nevažeći broj meseca. Broj treba biti između 1 i 12.");
    }
    
    return meseci[numberOfTheMonth - 1];
  }

  export function singleOrDefault <T>(array: T[], predicate: (item: T) => boolean): T | undefined {
    const filtered = array.filter(predicate);
    if (filtered.length > 1) {
      throw new Error("Sequence contains more than one matching element.");
    }
    return filtered[0];
  };

  export function getFileNameFromContentDisposition(
    resp: HttpResponse<Blob>,
    defaultName: string
  ): string {
    let fileName;
    if (resp && resp.headers && resp.headers.get('Content-Disposition')) {
      let val = resp.headers.get('Content-Disposition');
      let start = val.indexOf('filename=');
      if (start != -1) {
        let end = val.indexOf(';', start);
        fileName =
          end != -1 ? val.substring(start + 9, end) : val.substring(start + 9);
        fileName = fileName.split('"').join('');
      }
    }
    return fileName ?? defaultName;
  }

  export const getControl = <T extends BaseEntity>(formControlName: string & keyof T, formGroup: SpiderlyFormGroup<T>) => {
      if (formGroup == null)
        return null; // FT: When we initialized form group again this will happen
  
      if(formGroup.controlNamesFromHtml.findIndex(x => x === formControlName) === -1)
        formGroup.controlNamesFromHtml.push(formControlName);
  
      let formControl = formGroup.controls[formControlName] as SpiderlyFormControl;
      if (formControl == null) {
        console.error(`FT: The property ${formControlName} in the form group ${formGroup.getRawValue().typeName} doesn't exist`);
        return null;
      }
    
      return formControl;
  }

  export function toCommaSeparatedString<T>(input: T[]): string {
    const stringList = input.map(item => (item?.toString() ?? ''));

    if (stringList.length > 1) {
        return `${stringList.slice(0, -1).join(', ')} and ${stringList[stringList.length - 1]}`;
    } else {
        return stringList[0] ?? '';
    }
  }

  export function isImageFileType(mimeType: string): boolean {
    if (mimeType.startsWith('image/')) {
        return true;
    }

    return false;
  }

  export function isExcelFileType(mimeType: string): boolean {
      if (mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          mimeType === 'application/vnd.ms-excel'
      ) {
          return true;
      }

      return false;
  }

  export const isNullOrEmpty = (input: string) => {
    if(input == null || input === ''){
      return true;
    }
    
    return false;
  }

  export const getSuccessMessageOptions = (detail: string, title?: string, key?: string) : ToastMessageOptions => {
    return {
      severity: 'success',
      summary: title ?? 'Successful action',
      detail: detail,
      life: 10000,
      key: key ?? 'app'
    };
  }

  export const getWarningMessageOptions = (detail: string, title?: string, sticky?: boolean, key?: string) : ToastMessageOptions => {
    return {
      severity: 'warn',
      summary: title ?? 'Warning',
      detail: detail,
      life: 10000,
      sticky: sticky,
      key: key ?? 'app'
    };
  }

  export const getEntityPluralName = (entity: SpiderlyClass) => {
    const pluralAttribute = entity.attributes.find(x => x.name === EntityAttributeCodes.TranslatePluralEn);
    return pluralAttribute == null ? `${entity.name}List` : pluralAttribute.value;
  }

  export const getEntityDisplayProperty = (entity: SpiderlyClass) => {
    return entity.properties.find(p => p.attributes.some(x => x.name === PropertyAttributeCodes.DisplayName));
  }

  export const initDropdownOptions = (entities: SpiderlyClass[]) => {
    let dropdownOptions: { [key: string]: PrimengOption[] } = {};

    entities.forEach(entity => {            
        const displayProperty = getEntityDisplayProperty(entity);

        dropdownOptions[entity.name] = entity.data.map((dataItem, i) => {
            return {
                label: displayProperty == null ? i : dataItem[displayProperty.name], 
                value: i.toString()
            }
        });
    });

    return dropdownOptions;
  }

  export function capitalizeFirstChar(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  export function kebabToTitleCase(input: string): string {
    return input
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  export type Ctor<T> = new (...args: any[]) => T;