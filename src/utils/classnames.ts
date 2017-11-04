type ArrayClassname = [string | null | undefined | boolean];
type ObjectClassname = {[index: string]: boolean | null | undefined};

export const classnames = (classes: ArrayClassname | ObjectClassname): string => {
    if (classes instanceof Array) {
        return classes.filter(c => !!c).join(' ');
    }

    if (classes instanceof Object) {
        return Object.keys(classes).filter(k => classes[k]).join(' ');
    }
    
    return '';
};
