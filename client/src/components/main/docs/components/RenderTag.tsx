import { FC, ReactNode } from "react";
import './styles/renderTagStyles.css'

interface IsetUpRender {
  text: string;
  idents: number;
  isATag: boolean;
  isAEndTag: boolean;
  composeTag: string;
}

interface IrenderTag {
  tag: IsetUpRender;
}

interface ITagElement {
  idents?: number,
  isAEndTag?: boolean,
  text: string
}

interface IComposeElement extends ITagElement {
  composeTag: string
}

const tabs = '  '

const setUpToRender = (arr: string[]): IsetUpRender[] => {
  return arr.map((elt) => {
    const isATag = elt.includes("<") && elt.includes(">");
    const isAEndTag = elt.indexOf("<") + 1 === elt.indexOf("/");
    const isAComposeTag =
      isATag && elt.lastIndexOf("<") !== elt.indexOf("<");

    let text = "";
    let idents = 0;
    let composeTag = "";

    if (isATag) {
      idents = elt.indexOf("<");

      if (isAComposeTag) {
        const idxTags = {
          idxStrOpenTag: elt.indexOf("<"),
          idxEndOpenTag: elt.indexOf(">"),
          idxStrCloseTag: elt.lastIndexOf("<"),
          idxEndCloseTag: elt.lastIndexOf(">"),
        };
        const openTag = elt.slice(
          idxTags.idxStrOpenTag + 1,
          idxTags.idxEndOpenTag,
        );
        const content = elt.slice(
          idxTags.idxEndOpenTag + 1,
          idxTags.idxStrCloseTag,
        );
        const closeTag = elt.slice(
          idxTags.idxStrCloseTag + 2,
          idxTags.idxEndCloseTag,
        );

        const isSameTag = openTag === closeTag;

        if (isSameTag) {
          (composeTag = openTag), (text = content);
        }
      } else {
        const limits = {
          start: elt.indexOf("<") + (isAEndTag ? 2 : 1),
          end: elt.indexOf(">"),
        };

        text = elt.slice(limits.start, limits.end);
      }
    } else {
      const idxStartChar = elt.indexOf("S");
      text = elt.slice(idxStartChar, elt.length - 1);
      idents = idxStartChar;
    }

    return {
      text,
      idents,
      isATag,
      isAEndTag,
      composeTag,
    };
  });
};

const TagKey = ({ isACloseTag = false, isForEnd = false }) => {
  return (
    <span className="linkSpace__tag_keys">
      {isForEnd ? ">" : `${isACloseTag ? "</" : "<"}`}
    </span>
  );
};

const TagElement: FC<ITagElement> = ({ idents, isAEndTag, text }) => {
  return (
    <div className={`linksSpace__tag`}>
      {tabs.repeat(idents ?? 0)}
      <TagKey isACloseTag = {isAEndTag} />
        <span className="linkSpace__tag_text">
          {text}
        </span>
      <TagKey isForEnd />
    </div>
  )
};

const ComposeTagElement: FC<IComposeElement> = ({ idents, text, composeTag }) => {
    const props = {
    text: composeTag
  }

  return (
    <div className="flex">
      <TagElement idents={idents} {...props} />
        <span className="linkSpace__tag__text">
          {text}
        </span>
      <TagElement isAEndTag {...props} />
    </div>
  )
}

const RenderTag: FC<IrenderTag> = ({ tag }) => {
  const props = {
    idents: tag.idents,
    text: tag.text
  }
  
  return (
    <>
      {tag.composeTag.length <= 0
        ? <TagElement isAEndTag={tag.isAEndTag} {...props} />
        : <ComposeTagElement composeTag={tag.composeTag} {...props} />
      }
    </>
  )
};

export const convertStrToNode = (str: string): ReactNode => {
  const tokens = str.split("\n");

  const Node = () => {
    return (
      <div className="flex flex-col">
        {setUpToRender(tokens).map((tok, i) => {
          return (
              <span key={`linkSpace__tag-${i}`}>
                {
                  tok.isATag || tok.composeTag.length > 0
                    ? <RenderTag tag={tok} />
                    : tok.text
                }
              </span>
            )
        })}
      </div>
    )
  }

  return (
    <>
      {tokens.length > 1
        ? <Node />
        : str
      }
    </>
  );
};
