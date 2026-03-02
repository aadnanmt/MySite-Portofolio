from flask import Blueprint, Response, current_app, url_for
from backend.utility.util import get_posts_cached

seo_bp = Blueprint('seo', __name__)

@seo_bp.route('/robots.txt')
def robots():
    content = (
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /static/\n"
        "\n"
        "Sitemap: https://aadnanmt.web.id/sitemap.xml\n"
    )
    return Response(content, mimetype='text/plain')

@seo_bp.route('/sitemap.xml')
def sitemap():
    base = "https://aadnanmt.web.id"
    posts = get_posts_cached(current_app.root_path)

    urls = [
        f"<url><loc>{base}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>",
        f"<url><loc>{base}/blog/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>",
    ]
    for post in posts:
        urls.append(
            f"<url>"
            f"<loc>{base}/blog/{post['slug']}</loc>"
            f"<lastmod>{post['date']}</lastmod>"
            f"<changefreq>never</changefreq>"
            f"<priority>0.6</priority>"
            f"</url>"
        )

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + '\n'.join(urls) +
        '\n</urlset>'
    )
    return Response(xml, mimetype='application/xml')
