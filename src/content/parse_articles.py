import re
import json

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    text = re.sub(r'\-\-+', '-', text)
    return text

with open('src/content/articles_raw.txt', 'r') as f:
    text = f.read()

# Define split points based on known headers or titles
# The text has headers like "SOS", "GIA", etc. followed by the Title then Body.
# I will inspect the text structure to manually define chunks or use heuristics.

# Manual delineation of articles based on Titles/Headers found in text:
# 1. NAWEC (Already done, but nice to have) - Start of text
# 2. SOS
# 3. GIA
# 4. Brussels
# 5. Turkish
# 6. EFSTH (starts after UTG...EFSTH block)
# 7. Poly Clinic
# 8. Ndemban
# 9. Sanitorium
# 10. Tanka Tanka
# 11. Methodist Special School
# 12. St Jones School for The Deaf (St. John's)
# 13. GOVI School for the Visually Impaired
# 14. IOM - Basse
# 15. MOBSE
# 16. UTG Event (Keeping The University...)
# 17. USET
# 18. ST Peter's Parish
# 19. GTTI

articles_data = []

# Helper to add article
def add_article(id, title, raw_body_lines):
    # filter empty lines and headers if caught
    content = [line.strip() for line in raw_body_lines if line.strip()]
    if not content:
        return
    
    # Simple heuristic: If first line looks like a header (short, all caps or Title Case), maybe skip?
    # But usually the title is passed separately.
    
    # Body is the first paragraph.
    body = content[0] if content else ""
    
    slug = slugify(title)
    
    articles_data.append({
        "id": id,
        "title": title,
        "img": "/assets/resources/aboutUs/articles/article-default.png",
        "body": body,
        "href": f"/residential/blog/{slug}",
        "button": "Read more",
        "categoryId": "case studies",
        "content": content
    })

# Splitting logic (approximate, since formatting is loose)
# I'll split by the known Headers/Titles
sections = [
    { "title": "DK Telecom Empowering NAWEC with Stronger Internet Connectivity", "start_marker": "DK Telecom Empowering NAWEC", "end_marker": "Reference:" },
    { "title": "DK Telecom and SOS Children’s Village Collaborating for Greater Impact", "start_marker": "DK Telecom and SOS Children’s Village", "end_marker": "Airport" },
    { "title": "DK Telecom Partnering with Gambia International Airlines", "start_marker": "DK Telecom Partnering with Gambia International Airlines", "end_marker": "Brussels" },
    { "title": "Keeping Brussels Airlines Connected in The Gambia", "start_marker": "Keeping Brussels Airlines Connected in The Gambia", "end_marker": "Turkish" },
    { "title": "DK Telecom Connecting Turkish Airlines in The Gambia", "start_marker": "DK Telecom Connecting Turkish Airlines in The Gambia", "end_marker": "UTG" },
    { "title": "DK Telecom Connecting Edward Francis Small Teaching Hospital", "start_marker": "DK Telecom Connecting Edward Francis Small Teaching Hospital", "end_marker": "Poly Clinic" },
    { "title": "Supporting Healthcare Through Connectivity", "start_marker": "Supporting Healthcare Through Connectivity", "end_marker": "Ndemban" },
    { "title": "DK Telecom Partnering with Ndemban Referral Hospital", "start_marker": "DK Telecom Partnering with Ndemban Referral Hospital", "end_marker": "Sanitorium" },
    { "title": "Connecting The Sanitorium Hospital to Better Care", "start_marker": "Connecting The Sanitorium Hospital to Better Care", "end_marker": "Tanka Tanka" },
    { "title": "DK Telecom & Tanka Tanka: Powering Mental Health Support", "start_marker": "DK Telecom & Tanka Tanka: Powering Mental Health Support", "end_marker": "Methodist Special School" },
    { "title": "DK Telecom Empowering Methodist Special Needs School through Connectivity", "start_marker": "DK Telecom Empowering Methodist Special Needs School through Connectivity", "end_marker": "St Jones School for The Deaf" },
    { "title": "DK Telecom Supporting St. John’s School for the Deaf with Connectivity", "start_marker": "DK Telecom Supporting St. John’s School for the Deaf with Connectivity", "end_marker": "GOVI School for the Visually Impaired" },
    { "title": "DK Telecom Connecting GOVI for Inclusive Education", "start_marker": "DK Telecom Connecting GOVI for Inclusive Education", "end_marker": "IOM - Basse" },
    { "title": "DK Telecom Supporting IOM in The Gambia", "start_marker": "DK Telecom Supporting IOM in The Gambia", "end_marker": "MOBSE" },
    { "title": "Partnering for Education with MoBSE", "start_marker": "Partnering for Education with MoBSE", "end_marker": "Peace Corp" },
    { "title": "Keeping The University of The Gambia connected to Knowledge and Opportunity", "start_marker": "Keeping The University of The Gambia connected to Knowledge and Opportunity", "end_marker": "USET" },
    { "title": "Supporting Education Through Connectivity", "start_marker": "Supporting Education Through Connectivity", "end_marker": "Archives:" },
    { "title": "A Sunday of Faith and Connection in Lamin", "start_marker": "A Sunday of Faith and Connection in Lamin", "end_marker": "Pictorial Reference:" },
    { "title": "Connecting Education at GTTI Polytechnic College", "start_marker": "Connecting Education at GTTI Polytechnic College", "end_marker": "END_OF_FILE" }
]

lines = text.split('\n')
current_id = 1

for i, section in enumerate(sections):
    start_idx = -1
    end_idx = -1
    
    # Find start
    for idx, line in enumerate(lines):
        if section["start_marker"] in line:
            start_idx = idx
            break
            
    # Find end
    if section["end_marker"] == "END_OF_FILE":
        end_idx = len(lines)
    else:
        for idx, line in enumerate(lines):
            if idx > start_idx and section["end_marker"] in line:
                end_idx = idx
                break
    
    if start_idx != -1 and end_idx != -1:
        # Extract Lines, skipping the Title line itself if it duplicates the marker, 
        # but often the marker IS the title line.
        # We want the content AFTER the title line.
        raw_lines = lines[start_idx+1:end_idx]
        
        # Clean up: Join lines that are part of the same paragraph?
        # The text has hard breaks. To do this properly, we should join lines that don't end in punctuation or start with a bullet?
        # For now, let's just clean empty lines. The user input seems to use blank lines to separate paragraphs mostly?
        # Actually looking at the raw text, it looks like hard wrapping.
        # "A reliable connectivity is essential for building reliable, more efficient institutions.\nThat is why DK Telecom..."
        # This looks like one paragraph split.
        # Strategy: Join all lines into a single string, then split by double newlines? 
        # But the raw text might not have double newlines.
        # Let's simple check: if a line ends with . ? ! " it might be end of paragraph.
        
        cleaned_content = []
        current_para = []
        
        for line in raw_lines:
            l = line.strip()
            if not l:
                if current_para:
                    cleaned_content.append(" ".join(current_para))
                    current_para = []
                continue
            
            current_para.append(l)
            
            # Heuristic: If line ends with terminal punctuation, end the paragraph
            # But avoid splitting on common abbreviations like St., Dr., Mr., Mrs.
            if (l.endswith('.') or l.endswith('?') or l.endswith('!') or l.endswith('"') or l.endswith('”')):
                if not (l.endswith('St.') or l.endswith('Dr.') or l.endswith('Mr.') or l.endswith('Mrs.') or l.endswith('No.')):
                    cleaned_content.append(" ".join(current_para))
                    current_para = []
            
        if current_para:
            cleaned_content.append(" ".join(current_para))
            
        add_article(current_id, section["title"], cleaned_content)
        current_id += 1

print(json.dumps(articles_data, indent=4))
