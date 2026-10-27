import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # Set 16:9 Widescreen dimensions (13.333 in x 7.5 in)
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # Blank layout

    # Asset paths
    assets_dir = r"c:\Users\rakes\OneDrive\Documents\antiG\ppt-presentation\assets"
    img_hero = os.path.join(assets_dir, "hero_agri.jpg")
    img_waste = os.path.join(assets_dir, "agri_waste.jpg")
    img_products = os.path.join(assets_dir, "bio_products.jpg")

    # Color Palette Definitions
    COLOR_BG = RGBColor(15, 23, 42)       # Slate Dark #0F172A
    COLOR_CARD = RGBColor(30, 41, 59)     # Dark Card #1E293B
    COLOR_BORDER = RGBColor(51, 65, 85)   # Border #334155
    COLOR_EMERALD = RGBColor(16, 185, 129)# Primary Accent #10B981
    COLOR_CYAN = RGBColor(56, 189, 248)   # Secondary Accent #38BDF8
    COLOR_WHITE = RGBColor(255, 255, 255) # Text Main #FFFFFF
    COLOR_MUTED = RGBColor(148, 163, 184)# Text Muted #94A3B8
    COLOR_BADGE_BG = RGBColor(6, 78, 59)  # Soft Emerald #064E3B

    def set_slide_background(slide):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = COLOR_BG

    def add_header(slide, badge_text, title_text, subtitle_text):
        # Badge Shape
        badge_shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.4), Inches(4.5), Inches(0.35))
        badge_shape.fill.solid()
        badge_shape.fill.fore_color.rgb = COLOR_BADGE_BG
        badge_shape.line.color.rgb = COLOR_EMERALD
        badge_shape.line.width = Pt(1)
        tf_b = badge_shape.text_frame
        tf_b.word_wrap = True
        p_b = tf_b.paragraphs[0]
        p_b.text = badge_text.upper()
        p_b.font.size = Pt(10)
        p_b.font.bold = True
        p_b.font.color.rgb = COLOR_EMERALD
        p_b.alignment = PP_ALIGN.CENTER

        # Title Text Box
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.7), Inches(0.6))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(26)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_WHITE

        # Subtitle Text Box
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(0.5))
        tf_s = sub_box.text_frame
        tf_s.word_wrap = True
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle_text
        p_s.font.size = Pt(13)
        p_s.font.color.rgb = COLOR_MUTED

    # ----------------------------------------------------
    # SLIDE 1: Hero & Vision (Image + Glass Text Card)
    # ----------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    # Full Hero Background Image (Right side)
    if os.path.exists(img_hero):
        slide1.shapes.add_picture(img_hero, Inches(5.5), Inches(0.8), Inches(7.0), Inches(5.9))

    # Hero Card (Left Side Overlay)
    hero_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(5.5), Inches(5.9))
    hero_card.fill.solid()
    hero_card.fill.fore_color.rgb = COLOR_CARD
    hero_card.line.color.rgb = COLOR_EMERALD
    hero_card.line.width = Pt(2)

    tf1 = hero_card.text_frame
    tf1.word_wrap = True
    tf1.margin_left = Inches(0.4)
    tf1.margin_top = Inches(0.4)

    p1 = tf1.paragraphs[0]
    p1.text = "SAMARTH FOUNDATION PROPOSAL"
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_EMERALD

    p2 = tf1.add_paragraph()
    p2.text = "Rayalaseema Green Industrial Grid (RGIG)"
    p2.font.size = Pt(24)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_WHITE
    p2.space_before = Pt(10)

    p3 = tf1.add_paragraph()
    p3.text = "Decentralized Agri-Waste Hubs for Sustainable Industrial Development"
    p3.font.size = Pt(13)
    p3.font.color.rgb = COLOR_CYAN
    p3.space_before = Pt(8)

    bullets = [
      "Themes: Industrial Development & Sustainable Environment",
      "Concept: Village-Level Biomass & Fibre Processing Hubs",
      "Target Region: Rayalaseema (Anantapur, Kurnool, Kadapa, Chittoor, Tirupati)",
      "Impact: +₹18,000 Annual Farmer Income Boost | 450+ Jobs per 10-Hub Cluster"
    ]
    for b in bullets:
        pb = tf1.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(11)
        pb.font.color.rgb = COLOR_WHITE
        pb.space_before = Pt(8)

    # Speaker Notes
    slide1.notes_slide.notes_text_frame.text = "Respected Judges, welcome to our proposal: The Rayalaseema Green Industrial Grid (RGIG). Instead of viewing agricultural waste as an environmental burden, RGIG converts crop residues into raw materials for high-value industrial manufacturing, creating a new economic engine for Rayalaseema."

    # ----------------------------------------------------
    # SLIDE 2: Problem Statement (Image + 4 Stats Cards)
    # ----------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, "THE REGIONAL CHALLENGE", "Water Scarcity & Unutilized Crop Residues", "Rayalaseema produces millions of tonnes of agricultural biomass currently burnt or wasted due to groundwater stress.")

    # Image (Right side)
    if os.path.exists(img_waste):
        slide2.shapes.add_picture(img_waste, Inches(7.2), Inches(2.1), Inches(5.3), Inches(4.8))

    stats_data = [
        {"val": "3.2M Tons", "lbl": "Agri-Waste Generated", "desc": "Groundnut shells, cotton & banana residue produced annually."},
        {"val": "₹0 Value", "lbl": "Farmer Waste Return", "desc": "Crop residues currently burnt or dumped with zero income."},
        {"val": "85% Stress", "lbl": "Groundwater Depletion", "desc": "Restricts traditional water-heavy manufacturing factories."},
        {"val": "72% Youth", "lbl": "Rural Migration Rate", "desc": "Out-migration due to lack of local manufacturing jobs."}
    ]

    card_w, card_h = Inches(2.9), Inches(2.25)
    coords = [
        (Inches(0.8), Inches(2.1)),
        (Inches(3.9), Inches(2.1)),
        (Inches(0.8), Inches(4.65)),
        (Inches(3.9), Inches(4.65))
    ]

    for i, st in enumerate(stats_data):
        cx, cy = coords[i]
        card = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, cy, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.25)

        pv = tf.paragraphs[0]
        pv.text = st["val"]
        pv.font.size = Pt(22)
        pv.font.bold = True
        pv.font.color.rgb = COLOR_EMERALD

        pl = tf.add_paragraph()
        pl.text = st["lbl"]
        pl.font.size = Pt(13)
        pl.font.bold = True
        pl.font.color.rgb = COLOR_WHITE
        pl.space_before = Pt(6)

        pd = tf.add_paragraph()
        pd.text = st["desc"]
        pd.font.size = Pt(10)
        pd.font.color.rgb = COLOR_MUTED
        pd.space_before = Pt(6)

    slide2.notes_slide.notes_text_frame.text = "Rayalaseema faces severe groundwater stress, making traditional water-heavy manufacturing difficult. Meanwhile, over 3 million tonnes of crop waste are burnt every year. RGIG turns this environmental challenge into our strongest economic asset."

    # ----------------------------------------------------
    # SLIDE 3: Proposed Solution (4 Process Step Cards)
    # ----------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, "PROPOSED INNOVATION", "Decentralized Village Processing Hubs (RGIG)", "A 4-step closed-loop economic model: Farmer → Collection → Processing → Industrial Sales.")

    steps_data = [
        {"num": "STEP 1", "title": "Village Collection Hubs", "desc": "Farmers sell groundnut shells, cotton stalks, and banana husk directly at local village centers for immediate cash."},
        {"num": "STEP 2", "title": "Micro-Processing Units", "desc": "Decentralized, low-water units process raw residue into standardized pellets, eco-fibres, and carbonized biochar."},
        {"num": "STEP 3", "title": "High-Value Manufacturing", "desc": "Produces high-calorific industrial fuel pellets, bio-packaging boards, and soil moisture improvers."},
        {"num": "STEP 4", "title": "Digital Grid & Sales", "desc": "Centralized marketplace connects village hubs directly to regional industrial buyers in Tirupati & Anantapur."}
    ]

    card_w3, card_h3 = Inches(2.7), Inches(4.8)
    start_x3, start_y3 = Inches(0.8), Inches(2.1)
    gap3 = Inches(0.3)

    for i, st in enumerate(steps_data):
        cx = start_x3 + i * (card_w3 + gap3)
        card = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, start_y3, card_w3, card_h3)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_EMERALD if i == 0 else COLOR_BORDER
        card.line.width = Pt(1.5 if i == 0 else 1)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.3)

        pn = tf.paragraphs[0]
        pn.text = st["num"]
        pn.font.size = Pt(11)
        pn.font.bold = True
        pn.font.color.rgb = COLOR_CYAN

        pt = tf.add_paragraph()
        pt.text = st["title"]
        pt.font.size = Pt(15)
        pt.font.bold = True
        pt.font.color.rgb = COLOR_WHITE
        pt.space_before = Pt(8)

        pd = tf.add_paragraph()
        pd.text = st["desc"]
        pd.font.size = Pt(11)
        pd.font.color.rgb = COLOR_MUTED
        pd.space_before = Pt(12)

    slide3.notes_slide.notes_text_frame.text = "Here is the RGIG architecture. Small processing units near villages pay farmers on the spot for crop residues, local youth operate the machinery, and finished eco-products are shipped to nearby industrial buyers in Anantapur and Tirupati."

    # ----------------------------------------------------
    # SLIDE 4: Products Showcase (Image + Product Cards)
    # ----------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, "PRODUCT MATRIX & REVENUE", "3 High-Value Eco-Industrial Product Lines", "Zero freshwater consumption required during primary processing.")

    # Image (Left side)
    if os.path.exists(img_products):
        slide4.shapes.add_picture(img_products, Inches(0.8), Inches(2.1), Inches(5.2), Inches(4.8))

    prods_data = [
        {"title": "Biomass Pellets & Briquettes", "subtitle": "Coal Substitute", "desc": "High-calorific eco-fuel replacing coal for industrial boilers, brick kilns, and thermal power units."},
        {"title": "Agri-Fibre Bio-Packaging", "subtitle": "Eco-Packaging", "desc": "Biodegradable packaging material & particle boards produced from banana husk & cotton stalks."},
        {"title": "Bio-Char Soil Improver", "subtitle": "Soil Modifier", "desc": "Carbon-rich soil modifier that increases soil moisture retention by +40% in drought-prone fields."}
    ]

    card_w4, card_h4 = Inches(6.2), Inches(1.45)
    start_y4 = Inches(2.1)
    gap4 = Inches(0.2)

    for i, pd_item in enumerate(prods_data):
        cy = start_y4 + i * (card_h4 + gap4)
        card = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.3), cy, card_w4, card_h4)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_BORDER

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.3)
        tf.margin_top = Inches(0.2)

        ps = tf.paragraphs[0]
        ps.text = pd_item["subtitle"].upper()
        ps.font.size = Pt(10)
        ps.font.bold = True
        ps.font.color.rgb = COLOR_CYAN

        pt = tf.add_paragraph()
        pt.text = pd_item["title"]
        pt.font.size = Pt(15)
        pt.font.bold = True
        pt.font.color.rgb = COLOR_EMERALD
        pt.space_before = Pt(4)

        pd = tf.add_paragraph()
        pd.text = pd_item["desc"]
        pd.font.size = Pt(10.5)
        pd.font.color.rgb = COLOR_MUTED
        pd.space_before = Pt(4)

    slide4.notes_slide.notes_text_frame.text = "RGIG manufactures three high-demand items: biomass fuel pellets that replace coal in industrial boilers, biodegradable packaging, and moisture-retaining bio-char that directly helps Rayalaseema's drought-prone soil."

    # ----------------------------------------------------
    # SLIDE 5: Economic Impact (4 Metric Highlight Cards)
    # ----------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, "EMPIRICAL IMPACT & ROI", "Economic & Social Impact Projections", "Calculated 3-Year Projection per 10-Hub Village Cluster.")

    impact_data = [
        {"val": "+₹18,000", "lbl": "Annual Farmer Income", "desc": "Additional annual income per smallholder selling crop residues."},
        {"val": "450+ Jobs", "lbl": "Rural Youth Jobs", "desc": "Direct local technical employment generated per 10-hub cluster."},
        {"val": "120,000 T", "lbl": "CO2 Offset / Year", "desc": "Reduces fossil fuel burning and eliminates open field crop burning."},
        {"val": "14 Months", "lbl": "Hub Payback Period", "desc": "Rapid ROI with low capital expenditure micro-processing machinery."}
    ]

    for i, imp in enumerate(impact_data):
        cx = start_x3 + i * (card_w3 + gap3)
        card = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, start_y3, card_w3, card_h3)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_EMERALD if i == 0 else COLOR_BORDER

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_top = Inches(0.4)

        pv = tf.paragraphs[0]
        pv.text = imp["val"]
        pv.font.size = Pt(26)
        pv.font.bold = True
        pv.font.color.rgb = COLOR_EMERALD

        pl = tf.add_paragraph()
        pl.text = imp["lbl"]
        pl.font.size = Pt(14)
        pl.font.bold = True
        pl.font.color.rgb = COLOR_WHITE
        pl.space_before = Pt(10)

        pd = tf.add_paragraph()
        pd.text = imp["desc"]
        pd.font.size = Pt(11)
        pd.font.color.rgb = COLOR_MUTED
        pd.space_before = Pt(10)

    slide5.notes_slide.notes_text_frame.text = "The financial feasibility is compelling. A single cluster of 10 village hubs boosts farmer income by ₹18,000 per year, creates 450 local jobs, and pays back initial capital in just 14 months."

    # ----------------------------------------------------
    # SLIDE 6: Execution Roadmap (3 Timeline Horizontal Cards)
    # ----------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide6)
    add_header(slide6, "3-PHASE EXECUTION PLAN", "Implementation Roadmap & Scalability", "Phased rollout from pilot hubs in Anantapur to a regional Rayalaseema grid.")

    phases_data = [
        {"phase": "PHASE 1 (MONTHS 1–6)", "title": "Pilot Launch in Anantapur & Kurnool", "desc": "Deploy 2 Pilot Hubs; sign off-take supply agreements with local industrial boiler units & brick kilns."},
        {"phase": "PHASE 2 (MONTHS 7–18)", "title": "10-Hub Grid & Skill Center", "desc": "Scale to 10 Village Hubs; launch digital marketplace app & youth machinery training program."},
        {"phase": "PHASE 3 (MONTHS 19–36)", "title": "Regional RGIG Expansion (50+ Hubs)", "desc": "Establish full regional grid across Tirupati, Kadapa, Chittoor & integrate carbon credit trading."}
    ]

    p_w, p_h = Inches(3.7), Inches(4.8)
    p_gap = Inches(0.3)

    for i, ph in enumerate(phases_data):
        cx = Inches(0.8) + i * (p_w + p_gap)
        card = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, start_y3, p_w, p_h)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_CARD
        card.line.color.rgb = COLOR_EMERALD if i == 0 else COLOR_BORDER
        card.line.width = Pt(1.5 if i == 0 else 1)

        tf = card.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.3)
        tf.margin_top = Inches(0.4)

        pp = tf.paragraphs[0]
        pp.text = ph["phase"]
        pp.font.size = Pt(11)
        pp.font.bold = True
        pp.font.color.rgb = COLOR_CYAN

        pt = tf.add_paragraph()
        pt.text = ph["title"]
        pt.font.size = Pt(16)
        pt.font.bold = True
        pt.font.color.rgb = COLOR_WHITE
        pt.space_before = Pt(10)

        pd = tf.add_paragraph()
        pd.text = ph["desc"]
        pd.font.size = Pt(11.5)
        pd.font.color.rgb = COLOR_MUTED
        pd.space_before = Pt(14)

    slide6.notes_slide.notes_text_frame.text = "We start with a 2-hub pilot in Anantapur & Kurnool within 6 months, expand to 10 hubs in Phase 2, and build a 50-hub regional grid by Year 3. RGIG connects sustainable environment with industrial development!"

    # Save Output PPTX File
    output_path = os.path.join(r"c:\Users\rakes\OneDrive\Documents\antiG\ppt-presentation", "Rayalaseema_RGIG_Proposal_v2.pptx")
    prs.save(output_path)
    print(f"Creative presentation successfully generated at: {output_path}")

    # Try saving to main file if not locked
    try:
        main_path = os.path.join(r"c:\Users\rakes\OneDrive\Documents\antiG\ppt-presentation", "Rayalaseema_RGIG_Proposal.pptx")
        prs.save(main_path)
        print(f"Updated main file at: {main_path}")
    except Exception as e:
        print(f"Note: Main file locked by PowerPoint viewer, saved to Rayalaseema_RGIG_Proposal_v2.pptx instead.")

if __name__ == "__main__":
    create_presentation()
