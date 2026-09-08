const activateTabFromHash = () => {
  const panelId = window.location.hash.slice(1);
  if (!panelId) return;

  let panel = document.getElementById(panelId);
  while (panel) {
    const tabs = panel.parentElement;
    if (!tabs || tabs.tagName.toLowerCase() !== "starlight-tabs") return;

    const panels = [...tabs.querySelectorAll(':scope > [role="tabpanel"]')];
    const tabIndex = panels.indexOf(panel);
    const tab = tabs.tabs?.[tabIndex];
    if (tabIndex < 0 || !tab || typeof tabs.switchTab !== "function") return;

    tabs.switchTab(tab, tabIndex, false);
    panel = tabs.closest('[role="tabpanel"]');
  }
};

const updateTabHash = (event) => {
  const target = event.target;
  const tab = target instanceof Element ? target.closest('[role="tab"]') : null;
  const href = tab?.getAttribute("href");
  if (href?.startsWith("#")) history.replaceState(null, "", href);
};

customElements.whenDefined("starlight-tabs").then(() => {
  activateTabFromHash();
  window.addEventListener("hashchange", activateTabFromHash);
  document.addEventListener("click", updateTabHash);
});
