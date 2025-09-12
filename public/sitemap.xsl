<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Octomatic | AI Automation Agency Amsterdam</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; color: #333; max-width: 900px; margin: 2em auto; padding: 1em; background-color: #f9f9f9; }
          table { width: 100%; border-collapse: collapse; margin: 1em 0; background-color: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          th, td { padding: 0.8em 1em; text-align: left; border-bottom: 1px solid #eee; }
          th { background-color: #324c9e; color: #fff; font-weight: 600; }
          tr:nth-child(even) { background-color: #fdfdfd; }
          h1 { color: #324c9e; margin-bottom: 0.5em; font-size: 1.8em; border-bottom: 2px solid #324c9e; padding-bottom: 0.3em; }
          p { margin: 0.5em 0 1.5em 0; color: #555; }
          a { color: #1a73e8; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .url { width: 45%; }
          .priority, .changefreq, .lastmod { width: 10%; }
          .alternate { width: 25%; }
          .alternate div { margin-bottom: 0.3em; font-size: 0.9em; }
          .alternate span { font-weight: 600; color: #333; }
        </style>
      </head>
      <body>
        <h1>Octomatic AI Automation Agency - XML Sitemap</h1>
        <p>Generated on: <xsl:value-of select="format-date(current-date(), '[Y0001]-[M01]-[D01]')"/> | Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
        <table>
          <thead>
            <tr>
              <th class="url">URL</th>
              <th class="lastmod">Last Modified</th>
              <th class="changefreq">Change Freq.</th>
              <th class="priority">Priority</th>
              <th class="alternate">Alternate Links</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:priority"/></td>
                <td>
                  <xsl:for-each select="xhtml:link">
                    <div><span><xsl:value-of select="@hreflang"/></span>: <a href="{@href}"><xsl:value-of select="@href"/></a></div>
                  </xsl:for-each>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>