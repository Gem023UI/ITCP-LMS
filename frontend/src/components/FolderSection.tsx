import Folder from "./Folder";
import Reveal from "./Reveal";
import "./FolderSection.css";

/* EDIT THESE ------------------------------------------------------------ */
const TITLE = "Modules and progress--all in one place.";
const TEXT =
  "Access every unit and module, track your progress, and pick up right where you left off, all organized in one place.";

// each item: { title } and optionally { image: "/photos/xyz.jpg" }
const ITEMS = [
  { title: "Brand guidelines" },
  { title: "Launch plan" },
  { title: "The pier" },
];
/* ----------------------------------------------------------------------- */

export default function FolderSection() {
  return (
    <section className="folder-section">
      <Reveal className="folder-section__folder">
        <Folder
          label="Archive"
          items={ITEMS}
          onItemClick={(item, index) => console.log(item, index)}
          mode="flap"
          variant="solid"
          layout="spread"
          color="#e6c78f"
          paperColor="#ffffff"
          tabPosition="right"
          openOn="click"
          size={1.3}
          frost={0.25}
          tilt={0.5}
          speed={1}
          bounce={0.4}
          peek
          intro
          draggable
          zoomOnClick
          theme="dark"
        />
      </Reveal>

      <Reveal as="h2" className="folder-section__title" delay={150}>
        {TITLE}
      </Reveal>
      <Reveal as="p" className="folder-section__text" delay={300}>
        {TEXT}
      </Reveal>
    </section>
  );
}