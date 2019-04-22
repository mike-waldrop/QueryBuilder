using System;
using System.Collections.Generic;
using System.Text;

namespace QueryBuilder.Shared
{
  public class TreeNode
  {
    public string Text { get; set; }
    public TreeNode Parent { get; set; }
    public string FullPath { get; set; }
    public List<TreeNode> Items { get; set; } = new List<TreeNode>();

    public void Add(TreeNode item)
    {
      item.Parent = this;
      Items.Add(item);
    }

  }
}
