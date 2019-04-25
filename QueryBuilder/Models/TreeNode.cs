using System;
using System.Collections.Generic;
using System.Text;

namespace QueryBuilder.Models
{
  public class TreeNode
  {
    public string Id { get; set; }
    public string Text { get; set; }
    public TreeNode Parent { get; set; }
    public string FullPath { get; set; }
    public string Type { get; set; }
    public List<TreeNode> Items { get; set; } = new List<TreeNode>();

    

  }
}
