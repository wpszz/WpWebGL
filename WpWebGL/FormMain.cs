using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WpWebGL
{
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    [System.Runtime.InteropServices.ComVisibleAttribute(true)]
    public partial class FormMain : Form
    {
        public FormMain()
        {
            InitializeComponent();

            IE.SetWebBrowserFeatures(webBrowser.Version.Major);
            webBrowser.ObjectForScripting = this;
            webBrowser.Navigate(Environment.CurrentDirectory + "/Script/index.html");
            webBrowser.DocumentCompleted += OnDocumentCompleted;
        }

        void OnDocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs _e)
        {
            try
            {

            }
            catch (Exception e)
            {
                MessageBox.Show(e.ToString(), "error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public string EditorLoadFileText(string filePath)
        {
            string ret = "";
            try
            {
                ret = System.IO.File.ReadAllText("Script/" + filePath);
            }
            catch (Exception e)
            {
                MessageBox.Show(e.ToString(), "error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            return ret;
        }
    }
}
