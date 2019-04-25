using QueryBuilder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace QueryBuilder.Shared
{
  public static class CreateObject
  {
    public static List<TreeNode> Create<T>()
    {
      var type = typeof(T);
      var root = new TreeNode { Text = type.Name, FullPath = type.Name };
      var result = Create(type, root);
      return  result.Items;
    }
    
    public static TreeNode Create(Type type, TreeNode td)
    {
    
      foreach (var pi in type.GetProperties())
      {
        var newNode = new TreeNode();
        newNode.Text = HumanizePropertyName(pi.Name);
        newNode.Id = pi.Name;
        //newNode.FullPath += $"{td.FullPath}.{newNode.Id}";
        
        if (pi.PropertyType.IsClass && pi.PropertyType.Namespace != "System")
        {
          if (pi.PropertyType.IsArray)
          {
            Type arrayChildrenType = pi.PropertyType.GetElementType();
            newNode.Type = "array";
            newNode.Text = $"{newNode.Text} []";
            newNode.Id = $"{newNode.Id}[{arrayChildrenType.Name}]";
            newNode.FullPath += $"{td.FullPath}.{newNode.Id}";
            Create(arrayChildrenType, newNode);
          }
          else if (pi.PropertyType.IsClass)
          {
            newNode.Type = "class";
            newNode.FullPath += $"{td.FullPath}.{newNode.Id}";
            Create(pi.PropertyType, newNode);
          }
        }
        else
        {
          newNode.Items = null;
          newNode.FullPath += $"{td.FullPath}.{newNode.Id}";
          newNode.Type = pi.PropertyType.ToString().Replace("System.", string.Empty);
        }
        td.Items.Add(newNode);
      }
      return td;
    }

    private static string HumanizePropertyName(string propName)
    {
      return Regex.Replace(propName, "(\\B[A-Z])", " $1");
    }

    //public static object Create(Type type)
    //{
    //  Console.WriteLine(type.Name);
    //  var obj = Activator.CreateInstance(type);
    //  foreach (var pi in type.GetProperties())
    //  {

    //    if (pi.PropertyType.IsClass && pi.PropertyType.Namespace != "System")
    //    {
    //      if (pi.PropertyType.UnderlyingSystemType.GenericTypeArguments.Count() > 0)
    //      {
    //        Console.WriteLine("\tIList<{0}>", pi.Name);
    //      }
    //      else if (pi.PropertyType.IsArray)
    //      {
    //        Console.WriteLine("\t{0}\t<array>", pi.Name);
    //        Type elementType = pi.PropertyType.GetElementType();
    //        object element = Create(elementType);
    //        var child = Array.CreateInstance(elementType, 1);
    //        child.SetValue(element, 0);
    //        pi.SetValue(obj, child);
    //      }
    //      else
    //      {
    //        Console.WriteLine("\t{0}\t<class>", pi.Name);
    //        var child = Create(pi.PropertyType);
    //        pi.SetValue(obj, child);
    //      }

    //    }
    //    else
    //    {
    //      Console.WriteLine("\t{0}\t{1}", pi.Name, pi.PropertyType);
    //    }
    //  }
    //  return obj;
    //}
  }
}
