using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FavoritesBrowser.Startup))]
namespace FavoritesBrowser
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
