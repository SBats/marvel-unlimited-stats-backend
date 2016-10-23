from django.db import models


class Creator(models.Model):
    marvel_id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200, blank=True)
    suffix = models.CharField(max_length=200, blank=True)
    full_name = models.CharField(max_length=600)
    url = models.URLField(blank=True)
    thumbnail = models.ImageField(blank=True)
    comics = models.ManyToManyField('Comic', through='Role', blank=True)
    events = models.ManyToManyField('Event', blank=True)
    series_list = models.ManyToManyField('Series', blank=True)

    def __str__(self):
        return self.fullName

    class Meta:
        ordering = ('first_name',)
