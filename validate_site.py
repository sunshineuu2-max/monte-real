from pathlib import Path
import re

root = Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "styles.css").read_text(encoding="utf-8")
js = (root / "script.js").read_text(encoding="utf-8")

assert html.count("<h1") == 1 and html.count("</h1>") == 1
assert 'lang="es"' in html
assert "prefers-reduced-motion" in css
assert "loading=\"lazy\"" in html and "srcset=" in html and "sizes=" in html
assert all(item in html for item in ["aria-expanded=", "aria-controls=", "aria-live=\"polite\""])
assert not re.search(r'<img\b[^>]*\balt=""', html)
for relative in ["styles.css", "script.js", "assets/monte-real-logo.png", "assets/foto-placeholder.svg"]:
    assert (root / relative).exists(), relative
assert "event.preventDefault()" in js and "window.open(whatsappUrl" in js
print("VALIDACIÓN: 1 h1, HTML y CSS presentes, recursos locales, etiquetas accesibles y JS verificados.")
