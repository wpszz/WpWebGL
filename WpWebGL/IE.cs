using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;
using System.Reflection;
using System.ComponentModel;
using Microsoft.Win32;

public static class IE
{
    /// <summary>
    /// 修改注册表信息来兼容当前程序
    /// </summary>
    public static void SetWebBrowserFeatures(int ieVersion)
    {
        // don't change the registry if running in-proc inside Visual Studio
        if (LicenseManager.UsageMode != LicenseUsageMode.Runtime)
            return;

        var appName = System.IO.Path.GetFileName(System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName);
        UInt32 ieMode = GetEmulationMode(ieVersion);
        var featureControlRegKey = @"HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Main\FeatureControl\";

        //设置浏览器对应用程序（appName）以什么模式（ieMode）运行
        Registry.SetValue(featureControlRegKey + "FEATURE_BROWSER_EMULATION", appName, ieMode, RegistryValueKind.DWord);

        // enable the features which are "On" for the full Internet Explorer browser(不晓得设置有什么用)
        Registry.SetValue(featureControlRegKey + "FEATURE_ENABLE_CLIPCHILDREN_OPTIMIZATION", appName, 1, RegistryValueKind.DWord);

        //Registry.SetValue(featureControlRegKey + "FEATURE_AJAX_CONNECTIONEVENTS", appName, 1, RegistryValueKind.DWord);
        //Registry.SetValue(featureControlRegKey + "FEATURE_GPU_RENDERING", appName, 1, RegistryValueKind.DWord);
        //Registry.SetValue(featureControlRegKey + "FEATURE_WEBOC_DOCUMENT_ZOOM", appName, 1, RegistryValueKind.DWord);
        //Registry.SetValue(featureControlRegKey + "FEATURE_NINPUT_LEGACYMODE", appName, 0, RegistryValueKind.DWord);
    }

    /// <summary>  
    /// 通过版本得到浏览器模式的值  
    /// </summary>   
    public static UInt32 GetEmulationMode(int browserVersion)
    {
        UInt32 mode = 11000; // Internet Explorer 11. Webpages containing standards-based !DOCTYPE directives are displayed in IE11 Standards mode.   
        switch (browserVersion)
        {
            case 7:
                mode = 7000; // Webpages containing standards-based !DOCTYPE directives are displayed in IE7 Standards mode.   
                break;
            case 8:
                mode = 8000; // Webpages containing standards-based !DOCTYPE directives are displayed in IE8 mode.   
                break;
            case 9:
                mode = 9000; // Internet Explorer 9. Webpages containing standards-based !DOCTYPE directives are displayed in IE9 mode.                      
                break;
            case 10:
                mode = 10000; // Internet Explorer 10.  
                break;
            case 11:
                mode = 11000; // Internet Explorer 11  
                break;
        }
        return mode;
    }
}