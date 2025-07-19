export const useTableOfContents = () => {
  // 見出しの型定義
  interface TocItem {
    id: string
    text: string
    level: number
    anchor: string
  }

  // マークダウンテキストから見出しを抽出
  const extractHeadings = (markdownText: string): TocItem[] => {
    const headings: TocItem[] = []
    const lines = markdownText.split('\n')
    
    lines.forEach((line, index) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        const level = headingMatch[1].length
        const text = headingMatch[2].trim()
        const anchor = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '') // 特殊文字を削除
          .replace(/\s+/g, '-')     // スペースをハイフンに
          .replace(/-+/g, '-')      // 連続するハイフンを1つに
          .trim()
        
        headings.push({
          id: `heading-${index}`,
          text,
          level,
          anchor: anchor || `heading-${index}`
        })
      }
    })
    
    return headings
  }

  // マークダウンテキストに見出しIDを追加
  const addHeadingIds = (markdownText: string): string => {
    const lines = markdownText.split('\n')
    
    return lines.map((line, index) => {
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
      if (headingMatch) {
        const hashes = headingMatch[1]
        const text = headingMatch[2].trim()
        const anchor = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
        
        return `${hashes} ${text} {#${anchor || `heading-${index}`}}`
      }
      return line
    }).join('\n')
  }

  // 目次のHTMLを生成
  const generateTocHtml = (headings: TocItem[]): string => {
    if (headings.length === 0) return ''

    let html = '<nav class="toc"><ol>'
    let currentLevel = 0

    headings.forEach((heading) => {
      if (heading.level > currentLevel) {
        // レベルが深くなる場合
        for (let i = currentLevel; i < heading.level - 1; i++) {
          html += '<li><ol>'
        }
        html += `<li><a href="#${heading.anchor}">${heading.text}</a>`
        currentLevel = heading.level
      } else if (heading.level === currentLevel) {
        // 同じレベル
        html += `</li><li><a href="#${heading.anchor}">${heading.text}</a>`
      } else {
        // レベルが浅くなる場合
        for (let i = currentLevel; i > heading.level; i--) {
          html += '</li></ol></li>'
        }
        html += `</li><li><a href="#${heading.anchor}">${heading.text}</a>`
        currentLevel = heading.level
      }
    })

    // 残りの要素を閉じる
    for (let i = currentLevel; i > 0; i--) {
      html += '</li>'
      if (i > 1) html += '</ol>'
    }
    html += '</ol></nav>'

    return html
  }

  // スムーススクロール
  const scrollToHeading = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return {
    extractHeadings,
    addHeadingIds,
    generateTocHtml,
    scrollToHeading
  }
}