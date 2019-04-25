export function replacer(key,value)
{
  if (key == "parent")
    return undefined;
  else if (key == "conditions" && !!value && value.length == 0)
    return undefined;
  else return value;
}
