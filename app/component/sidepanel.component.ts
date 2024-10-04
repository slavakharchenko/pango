import { expect, type Page } from '@playwright/test';
import { Component } from 'app';
import { step } from 'utils';

enum SidePanelElement {
  ADMIN = 'Admin',
}

export class SidePanelComponent extends Component {
  private readonly root = this.page.locator('aside.oxd-sidepanel');
  private readonly expandButton = this.root.locator('.oxd-main-menu-button');
  private readonly sidePanelElement = (name: SidePanelElement) => this.root.locator(`.oxd-main-menu-item--name:has-text(${name})`)

  constructor(page: Page) {
    super(page);
  }

  @step
  async openSidePanelElement(name: SidePanelElement) {
    await this.expandSidePanel();
    await this.sidePanelElement(name).click();
  }

  @step
  async expandSidePanel(expand = true) {
    const isExpandedFnc = () => {
      return this.root.evaluate((element, className) => {
        return !element.classList.contains(className);
      }, 'toggled');
    }

    let isExpanded = await isExpandedFnc();
    if (expand === isExpanded) {
      await this.expandButton.click();

      // Recheck if the state has changed after clicking
      isExpanded = await isExpandedFnc();

      if (expand === isExpanded) {
        throw new Error(`SidePanel is still ${expand ? 'expanded' : 'collapsed'} after attempting to change it.`);
      }
    }

    console.log(`Side panel is already in expected state: ${expand}`); // Use own logger, like winston
  }

  @step
  async expectLoaded() {
    await expect(this.root, `SidePanelComponent is not loaded`).toBeVisible();
  }
}
