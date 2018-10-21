const url = require('url')

class PlayerFirewall {
    filter (browserWindow) {
        browserWindow.webContents.session.webRequest.onHeadersReceived({}, (d, c) => {
            // Remove security header to access iframe.
            if (d.responseHeaders['x-frame-options'] || d.responseHeaders['X-Frame-Options']){
                delete d.responseHeaders['x-frame-options'];
                delete d.responseHeaders['X-Frame-Options'];
            }
    
            // Block all tracking domains and youtube ads.
            let host = url.parse(d.url).host
            let path = url.parse(d.url).pathname
    
            switch (host) {
                // External domains.
                case 'ade.googlesyndication.com':
                case 'yt3.ggpht.com':
                case 's0.2mdn.net':
                case 'googleads.g.doubleclick.net':
                case 'ad.doubleclick.net':
                case 'files.adform.net':
                case 'secure-ds.serving-sys.com':
                case 'pagead2.googlesyndication.com':
                case 'www.google.fr':
                    c({ cancel: true })
                    break
                default:
                    // Youtube paths.
                    switch (path) {
                        case '/api/stats/playback':
                        case '/player_204':
                        case '/ptracking':
                        case '/csi_204':
                        case '/api/stats/qoe':
                        case '/youtubei/v1/log_event':
                        case '/youtubei/v1/log_interaction':
                        case '/get_midroll_info':
                        case '/yts/jsbin/www-pagead-id-vflJZeyi4/www-pagead-id.js':
                        case '/yts/jsbin/www-pagead-id-vflJZeyi4':
                            c({ cancel: true })
                            break
                        default:
                            c({ cancel: false, responseHeaders: d.responseHeaders })
                    }
            }
        });
    }
}

module.exports = new PlayerFirewall()