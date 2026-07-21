import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-manual-page',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './manual-page.component.html',
  styleUrl: './manual-page.component.css',
})
export class ManualPageComponent {
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);

  filePath = signal('');
  private pendingFragment: string | null = null;

  constructor() {
    this.route.data.subscribe((data) => {
      const file = data['file'] as string;
      const title = data['title'] as string;
      this.filePath.set(`content/${file}`);
      this.titleService.setTitle(`${title} · Manual Hidráulico`);
    });

    this.route.fragment.subscribe((fragment) => {
      this.pendingFragment = fragment;
      this.scrollToFragment(fragment);
    });
  }

  onMarkdownReady(): void {
    this.scrollToFragment(this.pendingFragment);
  }

  private scrollToFragment(fragment: string | null): void {
    if (!fragment) {
      return;
    }
    const el = document.getElementById(fragment);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
