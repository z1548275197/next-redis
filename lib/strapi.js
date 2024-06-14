export async function getAllNotes() {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`)
  const data = await response.json();

  const res = {};

  data.data.forEach(({ id, attributes: { title, content, slug, updatedAt } }) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })

  return res
}

export async function addNote(data) {
  const response = await fetch(`http://127.0.0.1:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer e12fbbf17505b729805e52161001c40f0bb574baf3de8daaf36f9b56dd2c84284f33107a098d8ead372cca198f110635e847097178485ac48f0cb612c02b536e89adce34f8c7bad6e8679a2bae1f8f2b424836328b0ce1023bfe59999d75160357654995110608baac96f3fcc23c9e1c801d9fcec17a6f23dd440a5383ad7f0f',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json();
  return res.data.attributes.slug
}

export async function updateNote(uuid, data) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'bearer e12fbbf17505b729805e52161001c40f0bb574baf3de8daaf36f9b56dd2c84284f33107a098d8ead372cca198f110635e847097178485ac48f0cb612c02b536e89adce34f8c7bad6e8679a2bae1f8f2b424836328b0ce1023bfe59999d75160357654995110608baac96f3fcc23c9e1c801d9fcec17a6f23dd440a5383ad7f0f',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json()
}

export async function getNote(uuid) {
  const response = await fetch(`http://127.0.0.1:1337/api/notes?filters[slug][$eq]=${uuid}`)
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id
  }
}

export async function delNote(uuid) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'bearer e12fbbf17505b729805e52161001c40f0bb574baf3de8daaf36f9b56dd2c84284f33107a098d8ead372cca198f110635e847097178485ac48f0cb612c02b536e89adce34f8c7bad6e8679a2bae1f8f2b424836328b0ce1023bfe59999d75160357654995110608baac96f3fcc23c9e1c801d9fcec17a6f23dd440a5383ad7f0f',
      "Content-Type": "application/json"
    }
  })
  const res = await response.json()
}

