import { getTranslations } from "next-intl/server";
import {
  allergenIds,
  isMenuGroup,
  menuBlocks,
  type MenuItemData,
  type MenuSectionData,
} from "@/content/menu";
import "./MenuList.css";

export async function MenuList() {
  const t = await getTranslations("MenuPage");

  function resolveItems(items: MenuItemData[]) {
    return items.map((item) => {
      const descriptionKey = `items.${item.id}.description`;
      return {
        id: item.id,
        name: t(`items.${item.id}.name`),
        description: t.has(descriptionKey) ? t(descriptionKey) : undefined,
        price: item.price,
        allergens: item.allergens,
      };
    });
  }

  function renderSection(
    section: MenuSectionData,
    headingLevel: 2 | 3 = 2,
  ) {
    const items = resolveItems(section.items);
    const HeadingTag = headingLevel === 3 ? "h3" : "h2";
    const titleClass =
      headingLevel === 3 ? "menu__subsection-title" : "menu__section-title";

    return (
      <section key={section.id} id={section.id} className="menu__section">
        <HeadingTag className={titleClass}>
          {t(`sections.${section.id}`)}
        </HeadingTag>
        <ul className="menu__section-list">
          {items.map((item) => (
            <li key={item.id}>
              <article className="menu__item">
                <div className="menu__item-header">
                  <span className="menu__item-name">
                    {item.name}
                    {item.allergens?.length ? (
                      <sup className="menu__item-allergens">
                        ({item.allergens.join(";")})
                      </sup>
                    ) : null}
                  </span>
                  <span className="menu__item-dots" aria-hidden="true" />
                  <span className="menu__item-price">
                    {item.price.toFixed(2)} €
                  </span>
                </div>
                {item.description ? (
                  <p className="menu__item-description">{item.description}</p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <div className="menu__list">
      {menuBlocks.map((block) => {
        if (isMenuGroup(block)) {
          return (
            <div key={block.id} id={block.id} className="menu__group">
              <h2 className="menu__group-title">{t(`sections.${block.id}`)}</h2>
              <div className="menu__group-sections">
                {block.sections.map((section) => renderSection(section, 3))}
              </div>
            </div>
          );
        }

        return renderSection(block);
      })}

      <section id="allergeni" className="menu__section menu__allergens">
        <h2 className="menu__section-title">{t("allergens.title")}</h2>
        <ol className="menu__allergens-list">
          {allergenIds.map((id) => (
            <li key={id} className="menu__allergens-item">
              <span className="menu__allergens-number">{id}.</span>
              <span>{t(`allergens.${id}`)}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
